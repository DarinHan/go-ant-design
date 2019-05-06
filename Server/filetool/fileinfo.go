package filetool

import (
	"io/ioutil"
	"os"
	"time"
)

type MyFileInfo struct {
	Name      string
	FullPath  string
	TotalSize int64
	SubFiles  []MyFileInfo
}

func (fileinfo *MyFileInfo) GetSize() (float64, string) {
	if fileinfo.TotalSize < 1024 {
		return float64(fileinfo.TotalSize), "B"
	}

	if fileinfo.TotalSize < 1024*1024 {
		return float64(fileinfo.TotalSize) / 1024, "KB"
	}

	if fileinfo.TotalSize < 1024*1024*1024 {
		return float64(fileinfo.TotalSize) / 1024 / 1024, "MB"
	}

	if fileinfo.TotalSize < 1024*1024*1024*1024 {
		return float64(fileinfo.TotalSize) / 1024 / 1024 / 1024, "GB"
	}
	return float64(fileinfo.TotalSize), ""
}

func (fileinfo *MyFileInfo) GetSubFileInfos() error {
	subfiles, err := ioutil.ReadDir(fileinfo.FullPath)
	if err != nil {
		return err
	}

	for _, subfile := range subfiles {
		newfileinfo := MyFileInfo{}
		newfileinfo.FullPath = fileinfo.FullPath + string(os.PathSeparator) + subfile.Name()
		newfileinfo.Name = subfile.Name()

		if subfile.IsDir() {
			err := newfileinfo.GetSubFileInfos()
			if err != nil {
				return err
			}
			fileinfo.TotalSize += newfileinfo.TotalSize
			fileinfo.SubFiles = append(fileinfo.SubFiles, newfileinfo)
		} else {

			newfileinfo.TotalSize = subfile.Size()
			fileinfo.TotalSize += subfile.Size()
			fileinfo.SubFiles = append(fileinfo.SubFiles, newfileinfo)
		}
	}

	return nil
}

func (fileinfo *MyFileInfo) GetSubFileInfosWithGoRoutin() error {
	subfiles, err := ioutil.ReadDir(fileinfo.FullPath)
	if err != nil {
		return err
	}

	filechan := make(chan interface{})

	for _, subfile := range subfiles {
		if subfile.IsDir() {
			go func(osfile os.FileInfo) {
				newfileinfo := MyFileInfo{}
				newfileinfo.FullPath = fileinfo.FullPath + string(os.PathSeparator) + osfile.Name()
				newfileinfo.Name = osfile.Name()
				err := newfileinfo.GetSubFileInfos()
				if err != nil {
					filechan <- err
				} else {
					filechan <- newfileinfo
				}
			}(subfile)
		} else {
			go func(osfile os.FileInfo) {
				newfileinfo := MyFileInfo{}
				newfileinfo.FullPath = fileinfo.FullPath + string(os.PathSeparator) + osfile.Name()
				newfileinfo.Name = osfile.Name()
				newfileinfo.TotalSize = osfile.Size()
				filechan <- newfileinfo
			}(subfile)
		}
	}

	index := 0
	for {
		if index >= len(subfiles) {
			break
		}
		select {
		case file := <-filechan:
			{
				if v, ok := file.(MyFileInfo); ok {
					fileinfo.TotalSize += v.TotalSize
					fileinfo.SubFiles = append(fileinfo.SubFiles, v)
				} else {
					return err
				}
				index++
			}
		default:
		}
		time.Sleep(time.Microsecond)
	}

	return nil
}
