
<!-- Nav Left -->
<nav class="nav-left">
    <div class="wrapper">
        <div class="scroll-wrapper" data-simplebar>
            <div class="menu-container">
                <div class="menu menu-tab active">
                    <a href="#">
                        <div class="icon"><em class="fas fa-home"></em></div>
                        Home
                    </a>
                </div>

                <div class="menu has-children active mt-4">
                    <a href="#">
                        Careers 
                        <div class="chev"><em class="fas fa-chevron-down"></em></div>
                    </a>
                    <div class="submenu-container">
                        <?php
                            foreach([
                                'Teacher', '#Programmer', 'Engineer', 'Scientist',
                                'Doctor', 'Nurse', 'Firefighters', 'Architect',
                                'Lawyers', 'IT Manager', 'Financial Manager', 'Chef'
                            ] as $i=>$d){
                        ?>
                            <div class="submenu <?php if($i==1)echo 'active'; ?>">
                                <a href="#">
                                    <?= $d ?>
                                </a>
                            </div>
                        <?php }?>
                        <div class="submenu">
                            <a class="load-more" href="#">
                                Load More
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="menu has-children active">
                    <a href="#">
                        Groups 
                        <div class="chev"><em class="fas fa-chevron-down"></em></div>
                    </a>
                    <div class="submenu-container">
                        <div class="profile-icons">
                            <?php for($i=0; $i<5; $i++){?>
                                <a class="profile-icon" href="#">
                                    <div class="img-fill fit" style="background-image:url('assets/img/profile/0<?= $i+2 ?>.jpg');"></div>
                                </a>
                            <?php }?>
                            <a class="profile-icon load-more" href="#">
                                <em class="fas fa-plus-circle"></em>
                            </a>
                        </div>
                    </div>
                </div>
                
                <?php
                    foreach([
                        'Events', 'Reports', 'Time tracking', 'Settings'
                    ] as $i=>$d){
                ?>
                    <div class="menu">
                        <a href="#">
                            <?= $d ?> 
                        </a>
                    </div>
                <?php }?>

            </div>
        </div>
    </div>
</nav>
