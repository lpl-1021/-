<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form
        label-width="0px"
        class="login_from"
        ref="loginFromRef"
        :model="loginForm"
        :rules="loginFromRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="paddword">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            type="password"
            v-model="loginForm.paddword"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resstLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        paddword: "123456",
      },
      loginFromRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        paddword: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //   点击重置
    resstLoginFrom() {
      this.$refs.loginFromRef.resetFields();
    },
    login() {
      this.$refs.loginFromRef.validate(async (valid) => {
        if (!valid) return;
        // console.log(this.loginForm);
        const { data: res } = await this.$http.logins({
          username: this.loginForm.username,
          password: this.loginForm.paddword,
        });

        if (res.meta.status !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");
        console.log(res);

        window.sessionStorage.setItem("token", res.data.token);

        this.$router.push('/home')
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 300px;
    background: white;
    border-radius: 3px;
    .avatar_box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      background: white;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
}
.btns {
  width: 100%;
  display: inline-flex;
  justify-content: flex-end;
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>