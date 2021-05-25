<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once('include/header.php'); ?>
    <?php include_once('include/style.php'); ?>
<style>
html, body{height:100%;}

/* Popup Icon */
.popup-icon{position:relative; margin:2rem 3rem;}
</style>
</head>
<body>
    <div class="container">
        <?php for($i=0; $i<10; $i++){?>
            <div style="position:relative;">
                <a class="btn-popup-toggle" href="#" data-popup="<?= $i ?>">
                    Hover Me
                </a>

                <div class="popup-comment bshadow" data-popup="<?= $i ?>">
                    <div class="wrapper">

                        <div class="blocks">
                            <div class="block fw-wrap mr-2">
                                <a class="menu mt-1" href="#">
                                    <div class="icon">
                                        <img src="assets/img/icon/message.png" alt="Image Icon" />
                                    </div>
                                    <div class="text">Message</div>
                                </a>
                                <a class="menu mt-1" href="#">
                                    <div class="icon">
                                        <img src="assets/img/icon/poll.png" alt="Image Icon" />
                                    </div>
                                    <div class="text">Poll</div>
                                </a>
                                <a class="menu mt-1" href="#">
                                    <div class="icon">
                                        <img src="assets/img/icon/event.png" alt="Image Icon" />
                                    </div>
                                    <div class="text">Event</div>
                                </a>
                                <a class="menu mt-1" href="#">
                                    <div class="icon">
                                        <img src="assets/img/icon/alert.png" alt="Image Icon" />
                                    </div>
                                    <div class="text">Urgen alert</div>
                                </a>
                            </div>
                            <div class="block">
                                <a class="menu mt-1 btn-popup-toggle" href="#" data-popup="<?= $i ?>">
                                    <div class="icon">
                                        <img src="assets/img/icon/close.png" alt="Image Icon" />
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                        <div class="blocks no-padding">
                            <div class="block w-full">
                                <select>
                                    <option value="" disabled selected>Choose category</option>
                                    <option value="1">Category 1</option>
                                    <option value="2">Category 2</option>
                                    <option value="3">Category 3</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="blocks no-padding">
                            <div class="block w-full">
                                <input type="text" placeholder="Subject" />
                            </div>
                        </div>
                        
                        <div class="blocks no-padding">
                            <div class="block w-full">
                                <textarea rows="5" placeholder="Message"></textarea>
                            </div>
                        </div>
                        
                        <div class="blocks no-padding">
                            <div class="block w-full">
                                <select>
                                    <option value="1">Visible to Anyone</option>
                                    <option value="2">Visible to Friends Only</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="blocks fw-wrap">
                            <div class="block">
                                <div class="btns mr-2">
                                    <a class="btn btn-action btn-color-02 pl-3 pr-3 mt-1" href="#">
                                        <img class="img-icon mr-1" src="assets/img/icon/add-photo.png" alt="Image Icon" />
                                        Add photo or video
                                    </a>
                                    <a class="btn btn-action btn-color-02 pl-3 pr-3 mt-1" href="#">
                                        <img class="img-icon mr-1" src="assets/img/icon/attach2.png" alt="Image Icon" />
                                        Attached file
                                    </a>
                                </div>
                            </div>
                            <div class="block">
                                <div class="btns">
                                    <a class="btn btn-action btn-color-01 mt-1" href="#">
                                        <span>POST</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>

            </div>
        <?php }?>
    </div>
    
    <?php include_once('include/script.php'); ?>
</body>
</html>
