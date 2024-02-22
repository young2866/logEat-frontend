<template>
    <div class="post_create" style="width : 80%; margin: 0 auto;">
        <div class="input-title">
            <label for="title">제목</label>
            <input class="title-input-place" type="text" id="title" v-model="title" placeholder="제목을 입력해주세요." />
        </div>
        <div class="input-category">
            <label for="category">카테고리</label>
            <input type="text" id="category" v-model="category" placeholder="카테고리를 입력해주세요." />
        </div>
        <div class="input-category">
            <label for="location">위치</label>
            <input type="text" id="location" v-model="location" placeholder="위치를 입력해주세요." />
        </div>
        <div id="app" style="width: 100%;">
            <label for="editor">내용</label>
            <ckeditor :editor="editor" v-model="contents" :config="editorConfig"></ckeditor>
        </div>
        <div class="post-buttons">
            <button class="post-back-button" @click="$emit('closeModal')">뒤로 가기</button>
            <div>
                <button class="post-write-button" @click="UpdatePost">작성완료</button>
            </div>
        </div>
    </div>
</template>
<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import axiosInstance from '../axios/index.js';
export default {
    props: ['updatePost'],
    name: 'app',
    components: {
        // Use the <ckeditor> component in this view.
        ckeditor: CKEditor.component
    },
    data() {
        return {
            title: this.updatePost.title,
            category: this.updatePost.category,
            location: this.updatePost.location,
            editor: Editor,
            contents: this.updatePost.contents,
            postId: this.updatePost.id,
            editorConfig: {
                placeholder: "내용을 작성해 주세요!",
                ckfinder: {
                    uploadUrl: "http://localhost:8080/post/image/upload",
                    withCredentials: true,
                }
            }
        };
    },
    methods: {
        UpdatePost() {
            axiosInstance.patch(
                "/post/" + this.postId + "/update",
                {
                    title: this.title,
                    category: this.category,
                    contents: this.contents,
                    location: this.location,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(response => {
                 console.log(response);
                 window.location.href =  "/";
                 });
        },
    }
}
</script>
<style>
.ck-editor__editable {
    min-height: 300px;
}

.ck-editor__main {
    font-size: 18px;
    height: 100%;
}
</style>
<style scoped>
.input-title {
    margin-top: 20px;
    margin-bottom: 15px;
}

.input-category {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 99%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
}

.post-write-button {
    width: 126px;
    height: 48px;
    border-radius: 8px;
    background-color: #FF4500;
    color: white;
    border: none;
    font-size: 16px;
    font-family: Inter;
    cursor: pointer;
}

.post-back-button {
    width: 126px;
    height: 48px;
    border-radius: 8px;
    background-color: #8A8A8A;
    color: white;
    border: none;
    font-size: 16px;
    font-family: Inter;
    cursor: pointer;
}

.post-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    bottom: 16px;
    margin-top: 10px;
}
</style>