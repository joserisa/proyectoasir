function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate().setTitle('Formulario de incidencias').setFaviconUrl('https://cdn.icon-icons.com/icons2/3023/PNG/512/notebook_address_book_book_icon_188753.png');
}
function cargarCursos() {
  
  const lCurso = [];

  //abre la hoja de calculo y recorre la primera columna hasta el final para
  //leer los cursos y pasarselos al desplegable de cursos de la pagina web
  
  //En la linea justo de abajo va la URL de la Hoja de calculo
  var hojaCurso = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1DzAGaUbqoCilc-vOB_gKWih_vzgupydTFGDcKvjuRmg/edit#gid=0').getSheets()[0];
  for(var i=1;i<=hojaCurso.getLastRow();i++){
    lCurso.push('<option>'+hojaCurso.getRange(i, 1).getValue()+'</option>');}
    console.log(lCurso);
return lCurso;
}