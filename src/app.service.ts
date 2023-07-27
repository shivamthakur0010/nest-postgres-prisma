import { Injectable } from "@nestjs/common";

Injectable()
export class AppService{
    constructor(){}
   async welcome(){
    return 'server is working';
   }
}