export interface IDrama{
    rant: number ; 
    complain : number ; 
    total : number ; 
}
export interface IPreferences {
     nsfw: boolean ; 
     darkMode : boolean;
     emailNotifications:boolean ; 
     showAdultContent : false ; 
     language?:string ;
}
export interface Retard {
    _id:string ;
    retardname : string ; 
    email: string ; 
    password : string ; 
    displayName: string ; 
    avatarUrl?:string ; 
    bannerUrl?:string ;
    drama: IDrama ;
    isVerified : boolean ; 
    preferences:IPreferences ;  


}


export interface AuthState { 
    retard : Retard | null ; 
    loading : boolean ;    
    error:string | null ; 
}