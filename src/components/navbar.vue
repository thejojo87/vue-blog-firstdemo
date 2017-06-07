<template>
  <div>
    <el-menu id="navbar" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <div id="navbar-menu">
        <el-menu-item index="1"><a href="#">jojo's blog</a></el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><router-link :to="{name: 'Hello'}">Hello</router-link></el-menu-item>
      <el-menu-item index="4"><router-link :to="{name: 'TimelinePage'}">我的足迹</router-link></el-menu-item>
      </div>
      <div class="form-group" v-if="this.getCurrentUser === ''" id="navbar-login">
        <input type="text" v-model="user.name" placeholder="用户名" class="form-control">
        <input type="password" v-model="user.password" placeholder="密码" class="form-control">
      </div>

      <div class="form-group" v-show="this.getCurrentUser !== ''">
        <a class="navbar-brand">欢迎你！ {{ user.name }} </a>
        <el-button type="submit" class="btn btn-success" v-on:click="logout">退出</el-button>
      </div>
        <div class="form-group" v-if="this.getCurrentUser === ''">
        <el-button type="submit" class="btn btn-success" v-on:click="login">登陆</el-button>
        <el-button type="submit" class="btn btn-success" v-on:click="registerFormVisible = true">注册</el-button>
        <el-dialog  title="注册" :visible.sync="registerFormVisible">
          <el-form :model="registerForm" :rules="rules" ref="registerForm">
            <el-form-item label="账号" prop="name" :label-width="registerFormLabelWidth">
              <el-input v-model="registerForm.name" ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password" :label-width="registerFormLabelWidth">
              <el-input type="password" v-model="registerForm.password" ></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="passwordConfirm" :label-width="registerFormLabelWidth">
              <el-input type="password" v-model="registerForm.passwordConfirm" ></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email" :label-width="registerFormLabelWidth">
              <el-input v-model="registerForm.email" ></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('registerForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('registerForm')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-menu>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import { Loading } from 'element-ui'
  export default {
    name: 'navbar',
    data () {
      // 验证password是否一致
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        activeIndex: '1',
        activeIndex2: '1',
        user: {
          name: '',
          password: ''
        },
        registerFormVisible: false,
        // 注册表
        registerForm: {
          name: '',
          password: '',
          passwordConfirm: '',
          email: ''
        },
        AV: this.$AVinit(),
        registerFormLabelWidth: '120px',
        rules: {
          name: [
            { required: true, message: '请输入注册账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          passwordConfirm: [
            { validator: validatePass2, trigger: 'blur' },
            { required: true, message: '请输入重复密码' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters({
        getCurrentUser: 'getCurrentUser'
      })
    },
    methods: {
      ...mapActions([
        'actionSaveCurrentUser',
        'actionInitCurrentUser'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 开始发送注册信号给leancloud
            // 获取loading
            let loadingInstance1 = Loading.service({ fullscreen: true })
            loadingInstance1.body = true
            const user = new this.AV.User()
            user.setUsername(this.registerForm.name)
            user.setEmail(this.registerForm.email)
            user.setPassword(this.registerForm.password)
            user.signUp().then((loginedUser) => {
              loadingInstance1.close()
              alert('注册成功')
              this.registerFormVisible = false
              this.resetForm('registerForm')
              // TOdo: 这里需要登陆才可以
            }, (error) => {
              loadingInstance1.close()
              alert(JSON.stringify(error))
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      login: function () {
        console.log('login开始了')
        if (this.user.name && this.user.password) {
          console.log(this.user.name, this.user.password)
          this.AV.User.logIn(this.user.name, this.user.password).then((loginedUser) => {
            console.log('登录成功')
            this.actionSaveCurrentUser(this.AV.User.current())
          }, function (error) {
            alert(error)
          })
        } else {
          this.$alert('用户名和密码不能为空', '输入错误', {
            confirmButtonText: '确定',
            callback: action => {
//              this.$message({
//                type: 'alert',
//                message: `用户名和密码不能为空`
//              })
            }
          })
        }
      },
      logout: function () {
        console.log('logout开始了')
        this.actionInitCurrentUser()
        this.AV.User.logOut()
      },
      // 用来操作我的工作台的，以后需要删掉 Todo
      handleSelect: function (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style>
  #navbar{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    /*flex-direction: column;*/
  }
  .form-group {
    /*width: 400px;*/
    display: flex;
    padding: 0;
    margin-bottom: 0;
  }
  #navbar-link {
    /*flex: 1;*/
  }
</style>
