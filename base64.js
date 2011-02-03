//Author: http://emilsblog.lerch.org/2009/07/javascript-hacks-using-xhr-to-load.html

BinaryBase64 = {
 
 // private property
 _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

 encodeBinary : function(input){
  var output = "";
  var bytebuffer;
  var encodedCharIndexes = new Array(4);
  var inx = 0;
  var paddingBytes = 0;
   
  while(inx < input.length){
   // Fill byte buffer array
   bytebuffer = new Array(3);
   for(jnx = 0; jnx < bytebuffer.length; jnx++)
    if(inx < input.length)
     bytebuffer[jnx] = input.charCodeAt(inx++) & 0xff; // throw away high-order byte, as documented at: https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
    else
     bytebuffer[jnx] = 0;
   
   // Get each encoded character, 6 bits at a time
   // index 1: first 6 bits
   encodedCharIndexes[0] = bytebuffer[0] >> 2;  
   // index 2: second 6 bits (2 least significant bits from input byte 1 + 4 most significant bits from byte 2)
   encodedCharIndexes[1] = ((bytebuffer[0] & 0x3) << 4) | (bytebuffer[1] >> 4);  
   // index 3: third 6 bits (4 least significant bits from input byte 2 + 2 most significant bits from byte 3)
   encodedCharIndexes[2] = ((bytebuffer[1] & 0x0f) << 2) | (bytebuffer[2] >> 6);  
   // index 3: forth 6 bits (6 least significant bits from input byte 3)
   encodedCharIndexes[3] = bytebuffer[2] & 0x3f;  
   
   // Determine whether padding happened, and adjust accordingly
   paddingBytes = inx - (input.length - 1);
   switch(paddingBytes){
    case 2:
     // Set last 2 characters to padding char
     encodedCharIndexes[3] = 64; 
     encodedCharIndexes[2] = 64; 
     break;
    case 1:
     // Set last character to padding char
     encodedCharIndexes[3] = 64; 
     break;
    default:
     break; // No padding - proceed
   }
   // Now we will grab each appropriate character out of our keystring
   // based on our index array and append it to the output string
   for(jnx = 0; jnx < encodedCharIndexes.length; jnx++)
    output += this._keyStr.charAt(encodedCharIndexes[jnx]);
  }
  return output;
 }
}