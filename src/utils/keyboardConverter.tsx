import React from 'react'

export const keyboardKeys:any = {
  "q": "ض",
  "w": "ص",
  "e": "ث",
  "r": "ق",
  "t": "ف",
  "y": "غ",
  "u": "ع",
  "i": "ه",
  "o": "خ",
  "p": "ح",
  "[": "ج",
  "]": "چ",
  "a": "ش",
  "s": "س",
  "d": "ی",
  "f": "ب",
  "g": "ل",
  "h": "ا",
  "j": "ت",
  "k": "ن",
  "l": "م",
  ";": "ک",
  "'": "گ",
  "z": "ظ",
  "x": "ط",
  "c": "ز",
  "v": "ر",
  "b": "ذ",
  "n": "د",
  "m": "پ",
  ",": "و"
}
export default function keyboardConverter(value:any){
 return value.split('').map((item:any) => keyboardKeys[item] ?? item).join('')
}