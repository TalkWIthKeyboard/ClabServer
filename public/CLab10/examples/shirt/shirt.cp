////////////////////////////////////////////////////////////
// File: shirt.csp
// Desc: CP file example. 
//       Shirt configuration problem 
// Auth: Rune M. Jensen
// Date: 7/19/04
////////////////////////////////////////////////////////////
 
type
  shirtColor {Black,White,Red,Blue};
  shirtSize  {Small,Medium,Large};
  shirtPrint {MIB,STW};   
	//shirtPrice{low,middle,high};  
variable
	
  shirtColor color;
  shirtSize  size; 
  shirtPrint print;
	
  

  
//shirtPrice price;
rule
(print==MIB)>>(color==Black);
(print==STW)>>(size!=Small);

//(print == MIB) >> (color == Black);//3
//( color==Red)>>(size==Large);//2
//(size==Medium)>>(print==STW);//4
//(print ==STW) >> (price == low);//3






 
     
