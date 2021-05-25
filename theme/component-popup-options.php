<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once('include/header.php'); ?>
    <?php include_once('include/style.php'); ?>
<style>
html, body{height:100%;}
</style>
</head>
<body>
    
    <div class="container">
        <div style="position:relative;">
            <h6>Hover Me</h6>
            <div class="popup-options bshadow">
                <div class="wrapper">
                    <div class="menu-container">
                        <a class="menu" href="#">
                            <div class="icon">
                                <img src="assets/img/icon/bell2.png" alt="Image Icon" />
                            </div>
                            <div class="text">Turn on notifications for this post</div>
                        </a>
                        <a class="menu" href="#">
                            <div class="icon">
                                <img src="assets/img/icon/embed.png" alt="Image Icon" />
                            </div>
                            <div class="text">Embed</div>
                        </a>
                    </div>
                    <div class="menu-container">
                        <a class="menu" href="#">
                            <div class="icon">
                                <img src="assets/img/icon/hide.png" alt="Image Icon" />
                            </div>
                            <div class="text">Hide Post</div>
                        </a>
                        <a class="menu" href="#">
                            <div class="icon">
                                <img src="assets/img/icon/sno-clock.png" alt="Image Icon" />
                            </div>
                            <div class="text">Snooze Derrick Sheril for 30 days</div>
                        </a>
                        <a class="menu" href="#">
                            <div class="icon">
                                <img src="assets/img/icon/unfollow.png" alt="Image Icon" />
                            </div>
                            <div class="text">Unfollow Derrick Sheril</div>
                        </a>
                        <a class="menu" href="#">
                            <div class="icon">
                                <img src="assets/img/icon/report.png" alt="Image Icon" />
                            </div>
                            <div class="text">Find suport or report post</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <?php include_once('include/script.php'); ?>
</body>
</html>
