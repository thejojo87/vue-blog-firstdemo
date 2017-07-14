<template>
<div id="newEditPreview">
  <div id="newEditPreviewEdit">
  <new-edit-bar></new-edit-bar>
  </div>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import NewEditBar from '../components/blog/newEditBar'
  export default {
    name: 'blogNewPreview',
    data () {
      return {
//        isAddBook: false,
//        newBookName: ''
      }
    },
    components: {
      NewEditBar
    },
    computed: {
      ...mapGetters({})
    },
    methods: {
      ...mapActions([])
    }
  }
</script>

<style>
#newEditPreview {
  width: 50%;
  height: 100%;
}
  #newEditPreviewEdit {
    border-right: 1px solid #d9d9d9;
    height: 100%;
  }

</style>
