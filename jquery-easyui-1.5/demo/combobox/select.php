<?php
/**
 *
 * @author        sAm(75424121@qq.com | tm166188 | rq)
 * @copyright (c) 2005 - 2015 NetDragon WebSoft Inc. All Rights Reserved.
 * @version       $Id$
 */
require_once './config.php';
//$rows = (int)$_POST['rows'];
//$page = (int)$_POST['page'];
//$start = $rows * ($page-1);
//$sql="SELECT * FROM `user` LIMIT {$start},{$rows}";
$sql="SELECT * FROM `user`";
$result = $db->query($sql);
$rows = array();
if($result){
	while($row = $result->fetch_assoc()){
		$rows[]=$row;
	}
	$result->close();
//	$db->next_result();
}
$db->close();
echo json_encode($rows);

