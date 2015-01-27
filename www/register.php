<?php  

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$db = new PDO('mysql:host=localhost;dbname=recipinoy','root','');
$stmt = $db->prepare('INSERT INTO users VALUES(?,?,?,?,?,?,?,?,?,?)');
$stmt->bindValue(1,$request->username,PDO::PARAM_STR);
$stmt->bindValue(2,$request->password,PDO::PARAM_STR);
$stmt->bindValue(3,$request->lname,PDO::PARAM_STR);
$stmt->bindValue(4,$request->fname,PDO::PARAM_STR);
$stmt->bindValue(5,$request->mi,PDO::PARAM_STR);
$stmt->bindValue(6,$request->gender,PDO::PARAM_STR);
$stmt->bindValue(7,$request->dob,PDO::PARAM_STR);
$stmt->bindValue(8,$request->address,PDO::PARAM_STR);
$stmt->bindValue(9,$request->contactno,PDO::PARAM_STR);
$stmt->bindValue(10,$request->email,PDO::PARAM_STR);
$stmt->execute();
if($stmt->rowCount() > 0) {
	echo "Successfully inserted!";
}