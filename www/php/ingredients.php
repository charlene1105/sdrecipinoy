<?php  

if(isset($_GET['rcpno'])) {
	$rcpno = $_GET['rcpno'];	
} else {
	$rcpno = "";
}
$db = new PDO('mysql:host=localhost;dbname=recipinoy','root','');
$stmt = $db->prepare("SELECT r.rcpname, i.ingrdntname
FROM recipes r, ingredients i
WHERE r.rcpno = i.rcpno AND r.rcpno = ?");
$stmt->bindValue(1,"$rcpno%",PDO::PARAM_STR);
$stmt->execute();


if($stmt->rowCount() > 0) {
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($results);	
} else {
	echo "No results";
}
