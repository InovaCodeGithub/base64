# base64



Como usar 

1.Pelo POSTMAN dentro do body, enviar uma requisição com esse formato

POST - base_url/convert

{
	"img": "link base64"
}


2. Obter os links das versões da imagem, e seus tipos

Pelo POSTMAN realizar o get com uma requisição nesse formato

GET - base_url/img

Formato da response:

{
  success: true/false,
  messsage: '',
  items: [
    {
      id: string,
      files: [
        {
          type: string,
          path: string
        }
      ]
    }
  ]
}

