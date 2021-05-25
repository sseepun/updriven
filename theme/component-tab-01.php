<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once('include/header.php'); ?>
    <?php include_once('include/style.php'); ?>
</head>
<body>
    
    <section>
        <div class="container">
            <div class="pt-6 pb-6" style="width:100%; max-width:900px;">

                <div class="bshadow p-4">
                    <h6 class="fw-600 color-01">Activity Log</h6>

                    <div class="tab-container mt-2">
                        <div class="tabs tabs-01">
                            <?php
                                foreach([
                                    'Post', 'Poll', 'Event', 'Urgent alert', 'Live video'
                                ] as $i=>$d){
                            ?>
                                <a 
                                    class="tab <?php if($i==0)echo 'active'; ?> color-sgray h-color-01 h6 sm fw-500" 
                                    href="#" data-tab="<?= $i ?>"
                                >
                                    <?= $d ?>
                                </a>
                            <?php }?>
                        </div>
                        <div class="tab-contents">
                            <?php
                                foreach([
                                    'Post', 'Poll', 'Event', 'Urgent alert', 'Live video'
                                ] as $i=>$d){
                            ?>
                                <div class="tab-content <?php if($i==0)echo 'active'; ?>" data-tab="<?= $i ?>">
                                    <div 
                                        style="
                                            display:block; width:100%; height:20rem; max-height:20rem;
                                            overflow-x:hidden; overflow-y:auto; padding:0 1rem 0 0;
                                        " 
                                        data-simplebar
                                    >
                                        <div class="gallery-grids">
                                            <?php for($j=0; $j<6; $j++){?>
                                                <div class="grid sm-100">
                                                    <div class="ss-card ss-card-05">
                                                        <div class="img-container">
                                                            <a class="ss-img square bradius-1" href="#">
                                                                <div class="img-bg" style="background-image:url('assets/img/profile/<?= sprintf('%02d', ($i+$j)%8+1) ?>.jpg'); width:100%;height:100%"></div>
                                                            </a>
                                                        </div>
                                                        <div class="text-container">
                                                            <p class="title">
                                                                Your searched Groups "Robot love"
                                                            </p>
                                                            <div class="ss-status p sm fw-500 op-60">
                                                                <div class="status">
                                                                    <div class="icon">
                                                                        <img src="assets/img/icon/only-me.png" alt="Image Icon" />
                                                                    </div>
                                                                    Only me
                                                                </div>
                                                                <div class="status">
                                                                    <div class="icon">
                                                                        <img src="assets/img/icon/time.png" alt="Image Icon" />
                                                                    </div>
                                                                    10:15PM
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="option-container">
                                                            <div class="icon">
                                                                <img src="assets/img/icon/3dot.png" alt="Image Icon" />
                                                            </div>
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
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            <?php }?>
                                        </div>
                                    </div>
                                </div>
                            <?php }?>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>
    
    <?php include_once('include/script.php'); ?>
</body>
</html>
