<?php
	session_start();
	include 'connectDB.php';


$arr = array('status' => "error:unknown error");
if($_DB_CONNECT_STATUS){
	if(session_is_registered('uid')){
		$result=mysql_query("SELECT * from ACCOUNT where uid=".$_SESSION['uid']);
		if($result){
			$username=mysql_result($result, 0,'username');
			$firstName=mysql_result($result, 0,'firstName');
			$lastName=mysql_result($result, 0,'lastName');
			$email=mysql_result($result, 0,'email');
			$arr = array('status' => "done:done",'username'=> $username,'firstName'=> $firstName,'lastName'=> $lastName,'email'=> $email);
		}else{
			$arr = array('status' => "error:not found this user");
		}
	}else{
		$arr = array('status' => "error:not login");
	}
	mysql_close($link);	
}else{
	$arr = array('status' => "error:database connect error");
}
echo json_encode($arr);


?>