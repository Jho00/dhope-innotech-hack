using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Xml.XPath;

namespace ParserHtml
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {

            
            string[] allfiles = Directory.GetFiles("Out");
            foreach (string filename in allfiles)
            {
                string path = filename;
                string s = "";
                using (StreamReader sr = new StreamReader(path))
                {
                    s = sr.ReadToEnd();
                    Console.WriteLine(s);
                    
                    var xDoc = XDocument.Parse(s);

                    string xPath = "//div[@class='footer__item']";

                        Console.WriteLine("*********************************");

                    foreach (var xElement in xDoc.XPathSelectElements(xPath))
                    {

                        Console.WriteLine((string)xElement);
                    }
                        Console.WriteLine("*********************************");
                    }
            }
            }
            catch
            {
                Console.WriteLine("Ошибка парсера");
            }
            //return;

            //using (StreamReader sr = new StreamReader(path, System.Text.Encoding.Default))
            //{
            //    string line;
            //    while ((line = sr.ReadLine()) != null)
            //    {
            //        Console.WriteLine(line);
            //    }
            //}


            Console.ReadKey();
        }
    }
}
