<?php
    foreach(scandir('./') as $file){
        if(strpos($file, '.php')!==false && !in_array($file, ['index.php', 'grids.php'])){
            echo '<a href="'.$file.'" target="_blank"><h2>'.$file.'</h2></a>';
        }
    }
?>
