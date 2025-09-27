class Apiresponse extends Error {
    contructor(statuscode , data , messsage = "success"){
        this.statuscode = statuscode
        this.data = data 
        this.success = successcode < 400
    }

        
}

export {Apiresponse}