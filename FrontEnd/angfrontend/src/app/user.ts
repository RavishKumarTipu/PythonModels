export class user 
{
    username : string;
    password: string;
    token: string;
    tokenexpired: boolean;
    role: string;
    actions: string;
}


export class action
{
    _id : string;
    role: string;
    action: number;
    description: string;
    parent: number;
    link: string;
    menuitem: string;
    childactions: action;
}

export class message 
{
    success : boolean;
    msg: string;
}

export class footermsg
{
    callstatus : number;
    message : message;
}

export class option
{
    name : string;
    value: string ;
}
export class formElementType
{
    _id: string;
    id: number;
    name : string;
    description: string;
    type : string;
    bgcolor : string;
    color: string;
    options : option[];

}


export class pymodel
{
    name : string;
    path : string;
    code : string;
    arguments: string[];
}