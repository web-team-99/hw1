package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
)

const shaPath string = "/sha"
const writePath string = "/write"

func main() {
	http.HandleFunc("/", handler)

	fmt.Println("Server running on port 8080...")
	fmt.Println(http.ListenAndServe(":8080", nil))
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func handler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	if r.URL.Path != shaPath && r.URL.Path != writePath {
		http.NotFound(w, r)
		return
	}
	if r.URL.Path == writePath && r.Method == "GET" {
		getRequestOnWritePath(&w, r)
		return
	}
	if r.URL.Path == shaPath && r.Method == "POST" {
		postRequestOnSHA256(&w, r)
		return
	}
	writer(http.StatusNotImplemented, []byte(http.StatusText(http.StatusNotImplemented)), &w)
}

func getRequestOnWritePath(w *http.ResponseWriter, r *http.Request) {		//Handle GET request.
	lnumber, err := strconv.Atoi(r.FormValue("lineNumber"))
	if err != nil {
		writer(http.StatusNotAcceptable, []byte("Field should be number."), w)
		return
	}
	line, err := readSpecLine("data.txt", lnumber)
	if err != nil {
		writer(http.StatusNotAcceptable, []byte(fmt.Sprint(err)), w)
		return
	}
	writer(http.StatusOK, []byte(line), w)
	return
}

func postRequestOnSHA256(w *http.ResponseWriter, r *http.Request) {		//Handle the POST request.
	fnum := r.FormValue("fnum")
	snum := r.FormValue("snum")

	fnumint, ferr := strconv.Atoi(fnum)
	snumint, serr := strconv.Atoi(snum)
	if ferr != nil || serr != nil {
		writer(http.StatusNotAcceptable, []byte("Fields should be numbers!!!"), w)
		return
	}
	sum := fnumint + snumint

	hash := sha256.Sum256([]byte(strconv.Itoa(sum)))
	result := base64.StdEncoding.EncodeToString(hash[:])
	jsonRes, _ := json.Marshal(map[string] string{"value": result})

	writer(http.StatusOK, jsonRes, w)
	return
}

func writer(statusCode int, message []byte, w *http.ResponseWriter) {		//Write the message to http response.
	(*w).WriteHeader(statusCode)
	(*w).Write([]byte(message))
}

func readSpecLine(fileName string, n int) (string, error) {		//Returns the specific line of the defined file.
	if n < 1 {
		return "", fmt.Errorf("selected line should be positive and non-zero")
	}

	file, err := os.Open(fileName)
	if err != nil {
		return "", err
	}
	defer file.Close()

	reader := bufio.NewReader(file)
	var line string
	for lineNum := 0; lineNum < n; lineNum++ {
		line, err = reader.ReadString('\n')
		if err == io.EOF {
			return "", fmt.Errorf("file has only %d lines", lineNum)
		}
		if err != nil {
			return "", err
		}
	}
	if line == "" {
		return "", fmt.Errorf("line %d is empty", n)
	}
	return line, nil

}
