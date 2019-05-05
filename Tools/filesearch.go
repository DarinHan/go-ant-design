package main

import (
	"Tools/filetool"
	"encoding/json"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/dir", handledir)
	err := http.ListenAndServe(":9898", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err.Error())
	}
	log.Println("server started succeed.")
}

func handledir(rw http.ResponseWriter, request *http.Request) {
	rw.Header().Set("Access-Control-Allow-Origin", "*") //允许访问所有域
	//rw.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型

	paras := request.URL.Query()
	rootpath := paras["root"][0]
	fileinfo := GetFiles(rootpath)
	bytes, err := json.Marshal(fileinfo)
	if err != nil {
		rw.WriteHeader(500)
		rw.Write([]byte(err.Error()))
	} else {
		rw.Write(bytes)
	}
}

func GetFiles(root string) *filetool.MyFileInfo {
	log.Println(root)
	rootfile := filetool.MyFileInfo{Name: root, FullPath: root}

	err := rootfile.GetSubFileInfos()
	if err != nil {
		panic(err)
	}
	return &rootfile
}
