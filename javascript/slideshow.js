/***********************************************
* Conveyor belt slideshow script- © Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

// agu.
blank = ' ';
h_blank = '&nbsp;';
empty = '';
quote = '"';
slash = '/';

// slider specs.
var sliderwidth = window.innerWidth + "px"
var sliderheight = Math.floor(window.innerHeight / 3);
if (sliderheight < 400){
  sliderheight = 400;
}
var slidespeed = 1;
slidebgcolor = "#0";

//Specify the slider's images
var leftrightslide = new Array();
var finalslide = empty;

//Specify pixels gap between each slideshow rotation (use integer):
var slideshowgap = 2;

image_height_in_slideshow = sliderheight - 58 + "px";
sliderheight = sliderheight + "px";

// debugging
console.log(sliderheight);
console.log(image_height_in_slideshow);

//Specify gap between each image (use HTML):
var imagegap = empty;

a_href = '<a href="';
a_href_end = '></a>';
slideshow_folder = "slideshow/";

image_filenames = [
  "2003_Schwabinger_Altstadtfest.jpg",
  "2003_Streetlive_Munich.jpg",
  "2004_Filmbuehne_Regensburg.jpg",
  "2004_Students-Party_Triesdorf.jpg",
  "2004_Volleyball-Party_Bad-Endorf.jpg",
  "2004_Wedding_Heiligenberg.jpg",
  "2005_beats_united_band.jpg",
  "2005_Jan_Rainer.jpg",
  "2005_Maisach_Bauhof_Andi_Olli.jpg",
  "2005_Maisach_Bauhof.jpg",
  "2005_Olli_Jan.jpg",
  "2007_Augsburg_Ratskeller.jpg",
  "2009_Oly_Fasching.jpg",
  "2009_Wedding_Hohenbercha.jpg",
  "2010_Oly_Fasching_Andi.jpg",
  "2010_Oly_Fasching_Joe.jpg",
  "2010_Oly_Fasching_Olli.jpg",
  "2011_Munich_Bar-Centrale.jpg",
  "2011_Wedding_Garmisch.jpg",
  "2012_Rocknacht_Wartenberg.jpg",
  "2012_Rocknacht_Wartenberg_stage_front.jpg",
  "2013_Summerparty_Ammersee_Rainer_Andi.jpg",
  "2014_Honkytonk_Schongau_Andi_Joe_Olli.jpg",
  "2015_Oly_carnival_Munich_Olli_Jan.jpg",
  "2015_Munich_Olylust_stage_crowd.jpg",
  "2015_Munich_StuStaCulum_stage_crowd.jpg",
  "2015_StuStaCulum_Munich_Nellie_The_Elefant.jpg",
  "2016_Munich_StuStaCulum.jpg",
  "2017_Munich_Chinaturm.jpg"
];

function shuffle(a_array){
  i = 0;
  j = 0;
  temp = null;
  for (i = a_array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = a_array[i];
    a_array[i] = a_array[j];
    a_array[j] = temp;
  }
}

// agu: random order of slideshow pics.
shuffle(image_filenames);

// agu: vars not neccessarily to be assigned in for loop.
h_class = 'class="img"';
h_height = 'height=' + image_height_in_slideshow;
h_target = 'target="_blank"';

for(i=0; i < image_filenames.length; i++) {
  current_file = image_filenames[i];
  h_alt = 'alt="' + current_file + quote;
  h_title = 'title="' + current_file + quote
  image = slideshow_folder + current_file;
  file_html_link = a_href + image + quote + blank + h_target + '><img src="' + image + quote + blank + h_alt + blank + h_height + blank + h_title + blank + h_class + a_href_end;
  leftrightslide.push(file_html_link);
}


////NO NEED TO EDIT BELOW THIS LINE////////////

var copyspeed = slidespeed;
leftrightslide = '<nobr>' + leftrightslide.join(imagegap) + '</nobr>';
var iedom = document.all||document.getElementById;

if(iedom){
  document.write('<span id="temp" style="visibility:hidden;position:absolute;top:-100px;left:-9000px">'+leftrightslide+'</span>');
}

var actualwidth = '';
var cross_slide;
var ns_slide;

function fillup(){
  if (iedom){
    cross_slide = document.getElementById? document.getElementById("test2") : document.all.test2;
    cross_slide2 = document.getElementById? document.getElementById("test3") : document.all.test3;
    cross_slide.innerHTML = cross_slide2.innerHTML = leftrightslide;
    actualwidth = document.all? cross_slide.offsetWidth : document.getElementById("temp").offsetWidth;
    cross_slide2.style.left = actualwidth+slideshowgap+"px";
  }
  else if (document.layers){
    ns_slide = document.ns_slidemenu.document.ns_slidemenu2;
    ns_slide2 = document.ns_slidemenu.document.ns_slidemenu3;
    ns_slide.document.write(leftrightslide);
    ns_slide.document.close();
    actualwidth = ns_slide.document.width;
    ns_slide2.left = actualwidth+slideshowgap;
    ns_slide2.document.write(leftrightslide);
    ns_slide2.document.close();
  }
  lefttime = setInterval("slideleft()", 30);
}

window.onload = fillup;
draw_table();

function slideleft(){
  if(iedom){
    if(parseInt(cross_slide.style.left) > (actualwidth*(-1)+8))
      cross_slide.style.left = parseInt(cross_slide.style.left) - copyspeed + "px";
    else
      cross_slide.style.left = parseInt(cross_slide2.style.left) + actualwidth + slideshowgap + "px";
    if(parseInt(cross_slide2.style.left)>(actualwidth*(-1)+8))
      cross_slide2.style.left = parseInt(cross_slide2.style.left) - copyspeed + "px";
    else
      cross_slide2.style.left = parseInt(cross_slide.style.left) + actualwidth + slideshowgap + "px";
  }
  else if(document.layers){
    if (ns_slide.left>(actualwidth * (-1) + 8))
      ns_slide.left -= copyspeed;
    else
      ns_slide.left = ns_slide2.left+actualwidth+slideshowgap;
    if(ns_slide2.left>(actualwidth * (-1) + 8))
      ns_slide2.left -= copyspeed;
    else
      ns_slide2.left = ns_slide.left + actualwidth + slideshowgap;
  }
}

function draw_table(){
  if(iedom || document.layers){
    with(document){
      document.write('<table border="0" cellspacing="0" cellpadding="0"><td>');
      if( iedom ){
        write('<div style="position:relative;width:' +sliderwidth+ ';height:' +sliderheight+ ';overflow:hidden">');
        write('<div style="position:absolute;width:' +sliderwidth+ ';height:' +sliderheight+ ';background-color:' +slidebgcolor+ '" onMouseover="copyspeed=0" onMouseout="copyspeed=slidespeed">');
        write('<div id="test2" style="position:absolute;left:0px;top:44px"></div>');
        write('<div id="test3" style="position:absolute;left:-1000px;top:44px"></div>');
        write('</div></div>')
      }
      else if(document.layers){
        write('<ilayer width=' +sliderwidth+ ' height=' +sliderheight+ ' name="ns_slidemenu" bgColor=' +slidebgcolor+ '>');
        write('<layer name="ns_slidemenu2" left=0 top=0 onMouseover="copyspeed=0" onMouseout="copyspeed=slidespeed"></layer>');
        write('<layer name="ns_slidemenu3" left=0 top=0 onMouseover="copyspeed=0" onMouseout="copyspeed=slidespeed"></layer>');
        write('</ilayer>');
      }
      document.write('</td></table>');
    }
  }
}
