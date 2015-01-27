<?php  
if(isset($_GET['name'])) {
	$name = $_GET['name'];	
} else {
	$name = "";
}

if(isset($_GET['location'])) {
	$location = $_GET['location'];	
} else {
	$location = "";
}

if(isset($_GET['category'])) {
	$category = $_GET['category'];	
} else {
	$category = "";
}


$db = new PDO('mysql:host=localhost;dbname=recipinoy','root','');
$stmt = $db->prepare("SELECT * FROM recipes WHERE rcpname like ? and category like ? and location like ?");
$stmt->bindValue(1,"$name%",PDO::PARAM_STR);
$stmt->bindValue(2,"$category%",PDO::PARAM_STR);
$stmt->bindValue(3,"$location%",PDO::PARAM_STR);
$stmt->execute();


if($stmt->rowCount() > 0) {
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($results);	
} else {
	echo "No results";
}
