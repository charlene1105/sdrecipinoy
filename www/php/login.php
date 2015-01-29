<?php  

$username = $_GET['username'];
$password = $_GET['password'];

$db = new PDO('mysql:host=localhost;dbname=recipinoy','root','');
$stmt = $db->prepare('SELECT COUNT(*) FROM users where username = ? and password = ?');
$stmt->bindValue(1,$username,PDO::PARAM_STR);
$stmt->bindValue(2,$password,PDO::PARAM_STR);
$stmt->execute();

echo $stmt->fetchColumn();
