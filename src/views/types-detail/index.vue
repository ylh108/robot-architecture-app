<template>
    <div class="router types-detail">
        <van-nav-bar title="机器人选型" left-arrow @click-left="onClickLeft" />
        <van-swipe class="my-swipe">
            <van-swipe-item>
                <van-image :src="require('@/assets/images/typesDetail/1.png')" alt="" />
            </van-swipe-item>
        </van-swipe>
        <van-search class="search" v-model="data.searchValue" left-icon show-action placeholder="关键字搜索" @search="onSearch">
            <template #action>
                <div @click="onSearch">
                    <van-icon name="search" />
                </div>
            </template>
        </van-search>
        <ul class="container">
            <li><span>机器人名称：</span><span>内墙板安装机器人</span></li>
            <li><span>基本功能：</span><span>-</span></li>
            <li><span>主要参数：</span><span>-</span></li>
            <li><span>评价</span><span>（26）</span></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
    components: {},
})
export default class typesDetail extends Vue {
    private data: any = {
        searchValue: '',
    }
    onClickLeft() {
        this.$router.go(-1)
    }
    onSearch() {}
}
</script>

<style lang="stylus" scoped>
.types-detail {
    .my-swipe {
        text-align: center;
    }

    .search {
        padding: 0.1rem;
    }

    .container {
        padding: 0.1rem;

        li {
            padding-bottom: 0.1rem;
        }
    }
}
</style>
