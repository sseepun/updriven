
<!-- Nav Right -->
<nav class="nav-right">
    <div class="wrapper">
        <div class="scroll-wrapper" data-simplebar>

            <h6 class="p lg fw-600 color-01">Sponsored</h6>
            <div class="ss-card ss-card-01 mt-2">
                <a class="ss-img vertical" href="#">
                    <div class="img-bg lazy-bg" data-src="assets/img/content/01.jpg"></div>
                </a>
                <div class="text-container">
                    <img class="img-client lazy-img" data-src="assets/img/client/01.png" alt="Client Logo" />
                    <p class="xxxs text-center mt-1">
                        ENROLL YOUR KIDS IN THE KUMON MATH AND READING PROGRAMS TODAY!
                    </p>
                    <div class="btns text-center mt-2">
                        <a class="btn btn-action btn-color-01" href="#">
                            <span>JOIN US</span>
                        </a>
                    </div>
                </div>
            </div>
            <?php for($i=0; $i<2; $i++){?>
                <div class="ss-card ss-card-01 mt-4">
                    <a class="ss-img vertical" href="#">
                        <div class="img-bg lazy-bg" data-src="assets/img/content/0<?= $i+2 ?>.jpg"></div>
                    </a>
                    <div class="text-container">
                        <div class="btns text-center mt-2">
                            <a class="btn btn-action btn-color-01" href="#">
                                <span>JOIN US</span>
                            </a>
                        </div>
                    </div>
                </div>
            <?php }?>
            
            <h6 class="p lg fw-600 color-01 mt-4">Live</h6>
            <?php for($i=0; $i<3; $i++){?>
                <div class="ss-card ss-card-02 mt-3">
                    <div class="img-container">
                        <a class="ss-img vertical" href="#">
                            <div class="img-bg" style="background-image:url('assets/img/content/0<?= $i+4 ?>.jpg');"></div>
                            <div class="play-container">
                                <div class="icon xs">
                                    <em class="fas fa-play"></em>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="text-container">
                        <a class="title p xs fw-600" href="#">
                            AKE GAMES WITHOUT CODE! - Unity 3D Game Kit
                        </a>
                        <p class="xxxs color-gray">
                            Brackeys
                        </p>
                    </div>
                </div>
            <?php }?>
            <div class="btns mt-2">
                <a class="p sm fw-600 color-gray h-color-01" href="#">
                    <u>Learn More</u>
                </a>
            </div>
            
            <h6 class="p lg fw-600 color-01 mt-4">Contacts</h6>
            <form action="/" method="GET">
                <div class="search-wrapper mt-1">
                    <input type="text" class="sm" placeholder="Search UpDriven" title="General Text Input" />
                    <div class="icon sm">
                        <img src="assets/img/icon/search.svg" alt="Search Icon" />
                    </div>
                </div>
            </form>
            <div class="profile-scroll-wrapper" data-simplebar>
                <div class="profile-wrapper">
                    <?php for($i=1; $i<10; $i++){?>
                        <a class="profile" href="#">
                            <div class="profile-icon">
                                <div class="img-fill fit" style="background-image:url('assets/img/profile/0<?= $i ?>.jpg');"></div>
                            </div>
                            <p class="fw-500">Alexandra Gheorghe</p>
                        </a>
                    <?php }?>
                </div>
            </div>

        </div>
    </div>
</nav>
