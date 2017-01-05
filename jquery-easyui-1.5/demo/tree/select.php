<?php
/**
 *
 * @author        sAm(75424121@qq.com | tm166188 | rq)
 * @copyright (c) 2005 - 2015 NetDragon WebSoft Inc. All Rights Reserved.
 * @version       $Id$
 */
require_once '../datagrid/config.php';
$id=isset($_POST['id']) ? intval($_POST['id']) : 0;
$sql="SELECT * FROM `tree` WHERE pid={$id}";
$result = $db->query($sql);
$rows = array();
if($result){
	while($row = $result->fetch_assoc()){
		$rows[]=$row;
	}
	$result->close();
}
$db->close();
echo json_encode($rows);

