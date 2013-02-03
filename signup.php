<?php
	include 'connectDB.php';
	header("Access-Control-Allow-Origin: *"); 

	$arr = array('status' => "error:unknown error");
	if($_DB_CONNECT_STATUS){
		$username=addslashes($_POST["u"]);
		$password=addslashes($_POST["p"]);
		$firstName=addslashes($_POST["f"]);
		$lastName=addslashes($_POST["l"]);
		$email=addslashes($_POST["e"]);
		if($username!="" && $password!=""){
			$result=mysql_query("INSERT INTO ACCOUNT (username, password, firstName,lastName,email) VALUES ('".$username."', '".$password."','".$firstName."','".$lastName."','".$email."')");
			if($result){
				$arr = array('status' => "done:sign up done");
			}else{
				$arr = array('status' => "error:insert data error");
			}
		}else{
			$arr = array('status' => "error:can't found post data(username and password)");
		}
		mysql_close($link);	
	}else{
		$arr = array('status' => "error:database connect error");
	}
	echo json_encode($arr);

?>