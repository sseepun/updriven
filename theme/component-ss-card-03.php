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
                        <div class="grid sm-100">
                            <div class="ss-card ss-card-03 bshadow">
                                <div class="img-container">
                                    <a class="ss-img adaptive" href="#">
                                        <div class="img-bg" style="background-image:url('assets/img/content/01.jpg');"></div>
                                    </a>
                                </div>
                                <div class="text-container">
                                    <?php if($i%2==0){?>
                                        <a class="title h5 sm fw-500 color-dark h-color-01" href="#">
                                            Robot Fans
                                        </a>
                                        <p class="desc fw-400 color-gray">
                                            Public group 21.8K members
                                        </p>
                                    <?php }else{?>
                                        <a class="title h5 sm fw-500 color-dark h-color-01" href="#">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium euismod urna, bibendum sollicitudin sapien porttitor vel. Cras in rutrum ante, nec tincidunt lorem. Phasellus hendrerit magna velit, et gravida ante dapibus ac. Vivamus in lectus maximus, vulputate elit eu, eleifend lectus. Nullam mattis arcu efficitur risus elementum maximus. Suspendisse finibus urna et nibh maximus blandit et at sapien. Nam eget ornare turpis. Integer non est dui. Donec sed quam ut quam tempus accumsan eget ac libero.
                                        </a>
                                        <p class="desc fw-400 color-gray">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium euismod urna, bibendum sollicitudin sapien porttitor vel. Cras in rutrum ante, nec tincidunt lorem. Phasellus hendrerit magna velit, et gravida ante dapibus ac. Vivamus in lectus maximus, vulputate elit eu, eleifend lectus. Nullam mattis arcu efficitur risus elementum maximus. Suspendisse finibus urna et nibh maximus blandit et at sapien. Nam eget ornare turpis. Integer non est dui. Donec sed quam ut quam tempus accumsan eget ac libero.
                                        </p>
                                    <?php }?>
                                    <div class="options">
                                        <div class="d-flex ai-center jc-space-between">
                                            <div class="btns">
                                                <a class="btn btn-action btn-md btn-color-01" href="#">
                                                    <span>JOIN</span>
                                                </a>
                                            </div>
                                            <p class="fw-400 color-gray ws-nowrap">
                                                45 posts a week
                                            </p>
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
