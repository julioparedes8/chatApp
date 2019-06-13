export interface Login{
    message:String;
    status:Number;
    resp:{
        refresh: String;
        token: String;
    };
}