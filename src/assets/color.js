const color = (type) => {
    let color = null
    type == 'fire' ? 
     color = 'rgb(233,110,93)' 
    : type == 'grass' ? 
     color ='rgb(111,189,167)'
    : type == 'water' ?
     color ='rgb(90,155,230)' 
    : type == 'bug' ?
     color ='rgb(174,185,68)'
    : type == 'electric' ?
     color ='rgb(239,199,95)'
    : type == 'normal' ?
     color ='rgb(170,170,155)'
    : type == 'ice' ?
     color ='rgb(126,203,250)'
    : type == 'fighting' ?
     color ='rgb(174,91,74)'
    : type == 'poison' ?
     color ='rgb(159,92,150)'
    : type == 'ground' ?
     color ='rgb(216,187,101)'
    : type == 'flying' ?
     color ='rgb(138,155,248)'
    : type == 'psychic' ?
     color ='rgb(237,99,152)'
    : type == 'rock' ?
     color ='rgb(185,170,111)'
    : type == 'ghost' ?
     color ='rgb(101,104,181)'
    :type == 'dragon' ?
     color ='rgb(114,107,230)'
    :type == 'dark' ?
     color ='rgb(114,86,71)'
    :type == 'steel' ?
     color ='rgb(170,170,186)'
    :type == 'fairy' ?
     color ='rgb(226,159,233)'
    : color ='rgb(169,117,110)'

    return color
}

export default color