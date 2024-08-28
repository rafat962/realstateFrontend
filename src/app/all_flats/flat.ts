export interface Flat {
  length: number;
  main_img:String;
  sub_img:string[];
  date:String;
  price:Number;
  bedrooms:Number;
  pathrooms:Number;
  area:Number;
  developer:String;
  devolper_logo:String;
  outdoor_description:String;
  type:String;
  Purpose:String;
  city:String;
  location:{
    type:String;
    coordinates:[Number],
    address:String
  },
  numSearch?:String;
  lovers?:[],
  createdAt?:String;
  updatedAt?:String;

}
