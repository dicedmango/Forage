<!DOCTYPE php>

<html>

<head>	

<title>Cookiebook</title>

</head>

<style>

body {background-color: #64ceff;}

p {font-size: 15pt; font-family: sans-serif; color: #fff;}
a {font-size: 15pt; font-family: sans-serif; color: #fff; text-decoration: none}

.logo {position: relative; width: 10%; padding: 100px; top: -30px;}

#text5
{
background: #fff;
color: #2e1b10;
width:85%;
height: 60px;
padding: 6px 15px 6px 35px;
border-radius: 10px;
box-shadow: 0 1px 0 #ccc inset;
transition:500ms all ease;
}

#line {
  background: green; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #ffd696 , #2e1b0e); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #ffd696, #2e1b0e); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #ffd696, #2e1b0e); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #ffd696 , #2e1b0e); /* Standard syntax */
}
/* The element to apply the animation to */
#line {
    width: 100%;
    height: 4px;
  
    animation-name: example;
    animation-duration: 4s;
}


button
{
background:  #9f805d;
color: #ccc;
width:90%;
height: 80px;
padding: 6px 15px 6px 35px;
border-radius: 10px;
box-shadow: 0 1px 0 #ccc inset;
transition:500ms all ease;
position: relative; top: 0px
font-family: sans-serif; font-size: 25px; color: #fff;
}

input {width: 400px; height: 40px; font-size: 20pt; }



</style>

<body> <center>
<a name="top"></a>
  <a href="set.html"><img class="logo" src="./img/settings.png" ></img></a>
  <a href="cookies.html"> <img class="logo" src="./logo/sh.png"></img></a>
     <a href="add.html"><img class="logo" src="./img/new.png"></img><br><br></a>

<div id="line">
<br><br><br>
   <form action="results.php" method="get">

  

  <input id="text5" type="text" name="input" onfocus="if (this.value=='Search') this.value = ''" type="text" value="" <?php echo $_GET ['input'];?>></imput>
  
  <button type="submit" value="search" > Search Ingredients</button>
</form>
<br><br><br><br>
<br><br>


<?php $input =  $_GET ['input'];
      $terms =  EXPLODE (" ", $INPUT);
      $query = "SELECT * FROM search WHERE ";
      foreach ($terms as $each){$i++; 
      if($i == 1){
      $query .= "keywords LIKE '%each%' ";}
      else {$query .= "OR keyword LIKE '%each%' "; }
      //connect to database -->
      mysql_connect("localhost", "root", "");
      mysql_select_db("database360");
      $query = mysql_query($query);
      $numrows = mysql_num_rows ($query);
      if ($numrows > 0) 

        {while ($row = mysqlfetch_assoc ($query)){
          $id = $row ['id'];
          $title = $row ['title'];
          $description = $row ['description'];
          $keywords = $row ['keywords'];
          $link = $row ['link'];

          echo "<h2><a href ='$link'>$title</a></h2>
          $description<br/><br/>";

        }
        }

        else
          echo"No Results Found For \"<b>$input</b>\"";
        //disconnect
        mysql_close();
?>


<a href="set.html"><img width="90%"src="./img/p1.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p2.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p3.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p4.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p5.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p1.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p2.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p3.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p4.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p5.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p1.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p2.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p3.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p4.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p5.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p1.png"></a>
<br><br>
<a href="set.html"><img width="90%"src="./img/p2.png"></a>
<br><br>

<a href="#top"><button type="button">Back To Top</button></a>
<br><br>
<br><br>
<p>Created by: <a href="www.maverickmedia.org.uk">Maverick Media</a></p><br><br>
</center>

</body>

<html>