<?php
	session_start();
	header("Access-Control-Allow-Origin: *"); 
	$arr = array('status' => "error:unknown error");
	if(session_is_registered('uid')){
		session_destroy();
		$arr = array('status' => "done:logout success");
	}else{
		$arr = array('status' => "error:logout error");
	}
	echo json_encode($arr);

?>