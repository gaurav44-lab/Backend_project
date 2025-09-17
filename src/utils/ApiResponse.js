class Apiresponse extends error {
    contructor(statuscode , data , messsage = "success"){
        this.statuscode = statuscode
        this.data = data 
        this.success = successcode < 400
    }

        
}