<?php
/**
 *
 * @author        sAm(75424121@qq.com | tm166188 | rq)
 * @copyright (c) 2005 - 2015 NetDragon WebSoft Inc. All Rights Reserved.
 * @version       $Id$
 */
require_once './config.php';
$row = $_POST['row'];
$flag=$db->query("UPDATE `user` SET `productid`='{$row['productid']}',`productname`='{$row['productname']}',`unitcost`='{$row['unitcost']}',`status`='{$row['status']}',`listprice`='{$row['listprice']}',`attr1`='{$row['attr1']}',`itemid`='{$row['itemid']}' where id='{$row['id']}'");
echo  $db->affected_rows;
$db->close();
