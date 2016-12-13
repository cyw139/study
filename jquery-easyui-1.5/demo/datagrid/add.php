<?php
/**
 *
 * @author        sAm(75424121@qq.com | tm166188 | rq)
 * @copyright (c) 2005 - 2015 NetDragon WebSoft Inc. All Rights Reserved.
 * @version       $Id$
 */
require_once './config.php';
$row = $_POST['row'];
$flag=$db->query("INSERT INTO `user`(`productid`,`productname`,`unitcost`,`status`,`listprice`,`attr1`,`itemid`) VALUES('{$row['productid']}','{$row['productname']}','{$row['unitcost']}','{$row['status']}','{$row['listprice']}','{$row['attr1']}','{$row['itemid']}')");
echo  $db->affected_rows;
$db->close();
