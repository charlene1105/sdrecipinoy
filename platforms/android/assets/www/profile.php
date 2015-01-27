<?php  

$username = $_GET['username'];
$db = new PDO('mysql:host=localhost;dbname=recipinoy','root','');
$stmt = $db->prepare('SELECT * FROM users where username = ?');
$stmt->bindValue(1,$username,PDO::PARAM_STR);
$stmt->execute();


if($stmt->rowCount() > 0) {
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($results);	
}
