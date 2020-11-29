// parser project main.go
package main

import (
	//"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
)

var count int = 0
var syncChan = make(chan string)

func fileRead(inFilename string) []string {
	bs, err := ioutil.ReadFile(inFilename)
	if err != nil {
		res := []string{"\nОшибка чтения"}
		println(res[0])
		return res
	}
	bsTostr := string(bs)
	var arrInput []string = strings.Split(bsTostr, "\r\n")
	return arrInput
}

func getParam() map[string]string {
	var f_name string
	flag.StringVar(&f_name, "src", "in.txt", "name of file")
	var catalog string
	flag.StringVar(&catalog, "out", "Out", "name of catalog")
	flag.Parse()
	paramMap := make(map[string]string)
	paramMap["src"] = f_name
	paramMap["out"] = catalog
	return paramMap
}

func flowParse(numIn int, urlIn string, pathOut string, all int) { //(номер, url, папка)
	resp, err := http.Get(urlIn) //получаем респонс
	if err != nil {
		syncChan <- "ошибка запроса"
		return
	}
	body, err := ioutil.ReadAll(resp.Body) //читаем его
	if err != nil {
		syncChan <- "ошибка чтения"
		return
	}
	defer resp.Body.Close()
	file, err := os.Create(pathOut + "\\" + strconv.Itoa(numIn) + ".txt") //создаем файл
	if err != nil {
		syncChan <- "ошибка создания файла"
		return
	}
	defer file.Close()
	file.WriteString(string(body)) //пишем респонс в файл
	count++
	syncChan <- "" + strconv.Itoa(numIn) + "-й готов. Осталось " + strconv.Itoa(all-count)
}

func main() {
	defer func() {
		if recover() != nil {
			fmt.Println("Произошла паника")
			os.Exit(1)
		}
	}()
	parametrs := make(map[string]string)
	parametrs = getParam()               //парметры (src, out)
	arrUrl := fileRead(parametrs["src"]) //[]URL
	fmt.Printf("\nВсего будет %d файлов\n", len(arrUrl))
	println("-----------------------------------------")
	for index, valueUrl := range arrUrl {
		go flowParse(index+1, valueUrl, parametrs["out"], len(arrUrl)) //(номер, url, папка, кол-во)
	}
	for index, _ := range arrUrl {
		result, ok := <-syncChan
		if !ok {
			panic("что-то не так")
		}
		fmt.Printf("%d:    "+result+"\n", index+1)
	}
	println("-----------------------------------------")
	println("Работа парсера завершена! Получено " + strconv.Itoa(count) + " файлов")
}
