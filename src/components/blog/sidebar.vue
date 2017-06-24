<template>
<div id="sidebar">
  <div class="site-author motion-element" itemprop="author" itemscope="" itemtype="http://schema.org/Person" style="opacity: 1; display: block; transform: translateX(0px);">
    <img class="site-author-image" itemprop="image" src="static/image/jojo.png" alt="Xuan Ji">
    <p class="site-author-name" itemprop="name">Xuan Ji</p>
    <p class="site-description motion-element" itemprop="description" style="opacity: 1; display: block; transform: translateX(0px);">保持输出,保持耐心</p>
  </div>
  <nav class="site-state motion-element" style="opacity: 1; transform: translateX(0px);">
    <div class="site-state-item site-state-posts">
      <a href="/archives">
        <span class="site-state-item-count">62</span>
        <span class="site-state-item-name">日志</span>
      </a>
    </div>


    <div class="site-state-item site-state-categories">
      <a href="/categories">
        <span class="site-state-item-count">4</span>
        <span class="site-state-item-name">分类</span>
      </a>
    </div>



    <div class="site-state-item site-state-tags">
      <a href="/tags">
        <span class="site-state-item-count">13</span>
        <span class="site-state-item-name">标签</span>
      </a>
    </div>


  </nav>
  <!--这里是我的社交链接-->
  <div class="links-of-author motion-element" style="opacity: 1; display: block; transform: translateX(0px);">


              <span class="links-of-author-item">
                <a href="https://github.com/thejojo87" target="_blank">

                    <i class="fa fa-globe"></i> github

                </a>
              </span>


  </div>
  <!--这里是我的友情链接-->
  <div class="links-of-blogroll motion-element" style="opacity: 1; display: block; transform: translateX(0px);">

    <div class="links-of-blogroll-title">Links</div>
    <ul class="links-of-blogroll-list">

      <li class="links-of-blogroll-item">
        <a href="http://douban.com/" target="_blank">豆瓣</a>
      </li>

      <li class="links-of-blogroll-item">
        <a href="http://theme-next.iissnan.com/" target="_blank">Next主题配置</a>
      </li>

      <li class="links-of-blogroll-item">
        <a href="https://hexo.io/" target="_blank">Hexo网站</a>
      </li>

      <li class="links-of-blogroll-item">
        <a href="https://www.google.com" target="_blank">Google</a>
      </li>

      <li class="links-of-blogroll-item">
        <a href="http://stackoverflow.com/" target="_blank">Stackoverflow</a>
      </li>

      <li class="links-of-blogroll-item">
        <a href="https://github.com/" target="_blank">Github</a>
      </li>

      <li class="links-of-blogroll-item">
        <a href="https://scrapy-chs.readthedocs.org/zh_CN/1.0/" target="_blank">Scrapy</a>
      </li>

      <li class="links-of-blogroll-item">
        <a href="https://www.djangoproject.com/" target="_blank">Django</a>
      </li>

    </ul>

  </div>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'sidebar',
    computed: {
      ...mapGetters({})
    },
    methods: {
      ...mapActions([])
    }
  }
</script>

<style>
#sidebar {
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 320px;
  height:100%;
  box-shadow: inset 0 2px 6px #000;
  background: #222;
  font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 14px;
  line-height: 2;
  color: #555;
}
.site-author {
  display: flex;
  margin-top: 50px;
}
.site-author-image{
  /*display: flex;*/
  /*display: block;*/
  /*margin: 0 auto;*/
  max-width: 180px;
  height: auto;
  border: 4px solid #000000;
  padding: 2px;
}
.site-author-name {
  margin: 5px 0 0;
  color: #f5f5f5;
  font-size: 22px;
}
.site-description {
  margin-top: 5px;
  font-size: 16px;
  color: #f7ecb5;
}
.links-of-blogroll-title {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 600;
}
#sidebar a {
  color: #d5d5d5;
  border-bottom-color: #555;
}
/*#sidebar a {*/
  /*color: #555;*/
  /*text-decoration: none;*/
  /*border-bottom: 1px solid #999;*/
  /*word-wrap: break-word;*/
/*}*/
.site-state {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 30px;
}
  .site-state-item{
    padding: 15px;
    display: flex;
    flex-direction: column;
  }
  .site-state-item a {
    display: flex;
    flex-direction: column;
    font-size: 20px;
  }

</style>
