<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once('include/header.php'); ?>
    <?php include_once('include/style.php'); ?>
</head>
<body>
    <?php include_once('include/nav-top.php'); ?>
    <?php include_once('include/nav-left.php'); ?>
    <?php include_once('include/nav-right.php'); ?>

    <div class="app-container">
        <div class="wrapper">
            <div class="ss-title-01">
                <div class="profile-icon lg no-hover my-0">
                    <div class="img-fill fit" style="background-image:url('assets/img/profile/12.jpg');"></div>
                </div>
                <h6 class="h5 sm fw-600">#Programmer</h6>
            </div>
            <?php for($i=0; $i<3; $i++){?>            
                <div class="post mt-3">
                    <div class="ss-img horizontal no-hover">
                        <div class="img-bg" style="background-image:url('assets/img/post/0<?= $i+1 ?>.jpg');"></div>
                    </div>
                    <div class="text-container">
                        <h6 class="title p sm fw-600 lh-xs">
                            The Top 5 Programming Languages in 2021 to get a job
                        </h6>
                        <div class="stat p xxxs fw-600 color-gray">
                            Aaron Jack
                            <em class="fas fa-circle mx-1"></em>
                            5 hours ago
                        </div>
                        <p class="xxs fw-300 color-gray lh-xs mt-1">
                            Want to get a developer job in 2021? Some languages are better than others.
                            <br><br>
                            Here's a top 5 (we actually talk about 9 languages total) --- based on 
                            real year-end data, not just opinion or generic advice.
                        </p>
                        <a class="post-icon top-right" href="#">
                            <em class="fas fa-ellipsis-h"></em>
                        </a>
                        <div class="toolbar">
                            <a class="post-icon icon-comment mr-3" href="#">
                                <em class="fas fa-comment-alt mr-1"></em>
                                239
                            </a>
                            <a class="post-icon icon-heart" href="#">
                                <em class="fas fa-heart mr-1"></em>
                                12.3K
                            </a>
                            <a class="post-icon icon-share mr-2" href="#">
                                <em class="fas fa-share-square"></em>
                            </a>
                            <a class="post-icon icon-ribbon" href="#">
                                <img src="assets/img/icon/ribbon.png" alt="Image Icon" />
                            </a>
                        </div>
                        <?php if($i==0){?>
                            <div class="comments">
                                <?php for($j=0; $j<2; $j++){?>
                                    <div class="comment">
                                        <div class="profile-icon sm no-hover my-0 mr-2">
                                            <div class="img-fill fit" style="background-image:url('assets/img/profile/0<?= $j+5 ?>.jpg');"></div>
                                        </div>
                                        <div class="text">
                                            <div class="wrapper">
                                                <p class="xxxs fw-600 lh-xs">
                                                    Stimson Gore
                                                </p>
                                                <p class="xxs fw-300 lh-xs">
                                                    Can mobile's notification Led light be 
                                                    controlled by python?
                                                </p>
                                            </div>
                                            <div class="d-flex mt-1">
                                                <p class="xxxs fw-600 color-gray mr-3">
                                                    1 hours ago
                                                </p>
                                                <a class="post-icon sm fw-600 mr-2" href="#">
                                                    <span>Like</span>
                                                </a>
                                                <a class="post-icon sm fw-600" href="#">
                                                    <span>Reply</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                <?php }?>
                            </div>
                            <div class="mt-1">
                                <a class="p xxxs fw-600 color-gray h-color-01" href="#">
                                    <u>View more comments</u>
                                </a>
                            </div>
                        <?php }?>
                        <form action="/" method="GET">
                            <div class="send-comment">
                                <div class="profile-icon sm no-hover my-0 mr-2">
                                    <div class="img-fill fit" style="background-image:url('assets/img/profile/08.jpg');"></div>
                                </div>
                                <div class="send-wrapper">
                                    <input type="text" class="xs gray" placeholder="Write a comment..." required title="General Text Input" />
                                    <button type="submit">
                                        <img src="assets/img/icon/send.svg" alt="Send Icon" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            <?php }?>
        </div>
    </div>
    
    <?php include_once('include/footer.php'); ?>
    <?php include_once('include/script.php'); ?>
</body>
</html>
