 <!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once('include/header.php'); ?>
    <?php include_once('include/style.php'); ?>
</head>
<body>

    <section>
        <div class="container">
            <div style="width:100%; max-width:900px;">
                <div class="gallery-grids">

                    <?php for($i=0; $i<5; $i++){?>
                        <div class="grid lg-1-3 sm-50">
                            <div class="ss-card ss-card-04 bshadow">
                                <div class="wrapper">
                                    <a class="ss-img vertical" href="#">
                                        <div class="img-bg" style="background-image:url('assets/img/content/01.jpg');"></div>
                                    </a>
                                    <div class="text-container">
                                        <?php if($i%2==0){?>
                                            <a class="title h5 sm fw-500 color-dark h-color-01 lh-xs" href="#">
                                                Master Industry 4.0
                                            </a>
                                            <p class="desc fw-400 color-gray mt-2">
                                                10:00 AM - 5:00 PM / May 28th #Programmer
                                                10:00 AM - 5:00 PM / May 28th #Programmer
                                                10:00 AM - 5:00 PM / May 28th #Programmer
                                                10:00 AM - 5:00 PM / May 28th #Programmer
                                            </p>
                                        <?php }else{?>
                                            <a class="title h5 sm fw-500 color-dark h-color-01 lh-xs" href="#">
                                                Master Industry 4.0 Design with Zerynth and Python
                                            </a>
                                            <p class="desc fw-400 color-gray mt-2">
                                                10:00 AM - 5:00 PM / May 28th #Programmer
                                            </p>
                                        <?php }?>
                                    </div>
                                    <div class="options">
                                        <div class="d-flex ai-center jc-space-between">
                                            <p class="fw-400 color-gray ws-nowrap">
                                                241 people join
                                            </p>
                                            <div class="btns w-auto">
                                                <a class="btn btn-action btn-md btn-color-01" href="#">
                                                    <span>JOIN</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php }?>

                </div>
            </div>
        </div>
    </section>

    <?php include_once('include/script.php'); ?>
</body>
</html>