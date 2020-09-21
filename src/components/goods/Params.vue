<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <el-alert title="注意：只允许第三级分类设置相关参数！" show-icon type="warning" :closable="false"></el-alert>

      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            expand-trigger="hover"
            :options="cateList"
            :props="cateProps"
            v-model="selectedCateKeys"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 动态添加参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数的按钮 -->
          <el-button
            type="primary"
            @click="addDialogVisible=true"
            size="mini"
            :disabled="isBtnDisabled"
          >添加参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableDate" border stripe>
            <!-- 这是展开航 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染tag标签 -->
                <el-tag
                  @close="handleClose(i,scope.row)"
                  closable
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                >{{item}}</el-tag>
                <!-- 输入文本框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <!-- 添加的按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="showEditDialog(scope.row.attr_id)"
                  icon="el-icon-edit"
                  size="mini"
                >编辑</el-button>
                <el-button
                  type="danger"
                  @click="removeParams(scope.row.attr_id)"
                  icon="el-icon-delete"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加属性的按钮 -->
          <el-button
            type="primary"
            @click="addDialogVisible=true"
            size="mini"
            :disabled="isBtnDisabled"
          >添加属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 这是展开航 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  @close="handleClose(i,scope.row)"
                  closable
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                >{{item}}</el-tag>
                <!-- 输入文本框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                ></el-input>
                <!-- 添加的按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="showEditDialog(scope.row.attr_id)"
                  icon="el-icon-edit"
                  size="mini"
                >编辑</el-button>
                <el-button
                  type="danger"
                  @click="removeParams(scope.row.attr_id)"
                  icon="el-icon-delete"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数的对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      @close="addDialogClosed"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <!-- 添加参数的对话框 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改参数的对话框 -->
    <el-dialog
      :title="'修改' + titleText"
      @close="editDialogClosed"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <!-- 添加参数的对话框 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品分类列表
      cateList: [],
      //   这是级联选择框的配置对象
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      //   这是级联选择框双向绑定到的数组
      selectedCateKeys: [],
      //   被激活的页签名称
      activeName: "many",
      //   这是动态参数的数据
      manyTableDate: [],
      // 这是静态属性的数据
      onlyTableData: [],
      //   控制添加对话框的显示与隐藏
      addDialogVisible: false,
      //   添加参数的表单数据对象
      addForm: {
        attr_name: "",
      },
      //   添加表单的验证规则对象
      addFormRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
      },
      //   控制修改对话框的显示与隐藏
      editDialogVisible: false,
      // 修改的表单对象
      editForm: {},
      //修改表单的验证规则对象
      editFormRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
      },
      //   控制按钮与文本的切换显示
      inputVisible: false,
      // 文本框中输入的内容
      inputValue: "",
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.categories();

      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败");
      }

      this.cateList = res.data;
    },
    // 级联选择框中选中项变化，会触发这个函数
    handleChange() {
      this.getParamsDate();
    },
    // 这是tab页签点击事件的处理函数
    handleTabClick() {
      this.getParamsDate();
    },
    // 获取参数的列表数据
    async getParamsDate() {
      // 证明选中的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
        this.manyTableDate=[]
        this.onlyTableData=[]
        return;
      }

      //   证明选中的是三级分类
      //   根据所选分类的id，和当前所处的面板，获取对应的参数
      const { data: res } = await this.$http.categorieslll(
        {
          sel: this.activeName,
        },
        this.cateId
      );

      if (res.meta.status !== 200) {
        return this.$message.error("获取参数列表失败");
      }

      res.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];

        // 控制文本框的显示与隐藏
        item.inputVisible = false;
        //  文本框中输入的值
        item.inputValue = "";
      });

      if (this.activeName === "many") {
        this.manyTableDate = res.data;
      } else {
        this.onlyTableData = res.data;
      }
    },
    // 监听对话框的关闭
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮添加参数
    addParams() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.categoriesllll(
          { attr_name: this.addForm.attr_name, attr_sel: this.activeName },
          this.cateId
        );
        if (res.meta.status !== 201) {
          return this.$message.error("添加参数失败");
        }
        this.$message.success("添加参数成功");
        this.addDialogVisible = false;
        this.getParamsDate();
      });
    },
    // 点击按钮，展示修改的对话框
    async showEditDialog(attr_id) {
      const { data: res } = await this.$http.categorieslllll(
        { attr_sel: this.activeName },
        this.cateId,
        attr_id
      );
      if (res.meta.status !== 200) {
        return this.$message.error("获取参数信息失败");
      }
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    // 重置修改的表单
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 这是点击按钮修改参数信息
    editParams() {
      this.$refs.editFormRef.validate(async (valid) => {
        const { data: res } = await this.$http.categoriesllllll(
          { attr_name: this.editForm.attr_name, attr_sel: this.activeName },
          this.cateId,
          this.editForm.attr_id
        );
        if (res.meta.status !== 200) {
          return this.$message.error("修改参数失败");
        }
        this.$message.success("修改参数成功");
        this.getParamsDate();
        this.editDialogVisible = false;
      });
    },
    // 根据Id删除对应的参数项
    async removeParams(attr_id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该参数, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      //   证明了用户取消了删除的操作
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      //  删除的业务逻辑
      const { data: res } = await this.$http.categorieslllllll(
        this.cateId,
        attr_id
      );
      if (res.meta.status !== 200) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getParamsDate();
    },
    // 文本框失去焦点，或按下回车键都会触发
    async handleInputConfirm(row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = "";
        row.inputVisible = false;
        return;
      }
      // 如果没有return,则证明输入的内容，需要做后续处理
      row.attr_vals.push(row.inputValue.trim());
      row.inputValue = "";
      row.inputVisible = false;
      // 需要发送请求保存这次操作
      this.saveAttrVlas(row);
    },
    // 将对attr_vals的操作，保存到数据库
    async saveAttrVlas(row) {
      // 需要发送请求保存这次操作
      const { data: res } = await this.$http.categoriesllllllll(
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(" "),
        },
        this.cateId,
        row.attr_id
      );
      if (res.meta.status !== 200) {
        return this.$message.error("修改参数项失败");
      }
      this.$message.success("修改参数项成功");
    },
    // 点击按钮显示输入框
    showInput(row) {
      row.inputVisible = true;
      // 让文本框自动获取焦点
      // $nextTick的作用，当页面上元素被重新渲染之后，才会指定回调函数中的代码
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 删除对应的参数可选项
    handleClose(i, row) {
      row.attr_vals.splice(i, 1);
      this.saveAttrVlas(row);
    },
  },
  computed: {
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true;
      }
      return false;
    },
    // 当前选中的三级分类的Id
    cateId() {
      if (this.selectedCateKeys.length == 3) {
        return this.selectedCateKeys[2];
      }
      return null;
    },
    // 动态计算标题的文本
    titleText() {
      if (this.activeName == "many") {
        return "动态参数";
      }
      return "静态属性";
    },
  },
};
</script>

<style lang="scss" scoped>
.cat_opt {
  margin: 15px 0;
}
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 120px;
}
</style>