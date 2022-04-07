<template>
  <a-layout has-sider>
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
    >
    <div class='logo'>
      <img src='../assets/logo.png' alt='lemon logo' style='width: 5rem;'>
      <p style='color: #fff; font-size: 10px;'> Like Melon, but different </p>
    </div>
    <div>
      <a-button type='primary' style='margin-top: 12px' @click='showModal'>
        Add Media Source
      </a-button>
      <a-modal v-model:visible='visible' title='Add a new media source' @ok='handleOk' footer=''>
        <div class='new_media_source'>
          <a-space align='center'>
            <a-button type='default'>Screenshare</a-button>
            <a-button class='stream_choice' type='default' @click='showUserTheirFace()'>Video Feed</a-button>
          </a-space>
        </div>
      </a-modal>
  </div>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ background: '#fff', padding: '24px', textAlign: 'center' }">
          <div class='stream' :span='12'>
            <video class='main_stream' autoplay></video>
          </div>
        </div>
        <div>
          <a-button type='default'>Resize</a-button>
        </div>
        <div>
          <a-space>
            <a-button class='show_video_please' @click='showUserTheirFace()' type='default'>Static 1</a-button>
            <a-button type='default'>Static 2</a-button>
            <a-button type='default'>Static 3</a-button>
          </a-space> 
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Lemon App ©2022 Like Melon, but different
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({

  /*
   * This is the setup for the "Add Media Source" Modal.
   */ 
  setup() {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };

    return {
      visible,
      showModal,
      handleOk,
    };
  },

  methods: {
    /*
    * This allows the browser to ask the user for audio or video input
    * which would allow us to showcase the media footage as a stream 
    */
    async showUserTheirFace() {
      navigator.mediaDevices.getUserMedia({
        video:{ width: 1280, height: 720 },
        audio: true,
      }).then(stream => {
        console.log('Got MediaStream:', stream);
        const videoElement = document.getElementsByClassName('main_stream');

        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(err => consol.log(err));
    },
  },
});
</script>

<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.new_media_source {
  display: flex;
  align-items: center;
  justify-content: center;
}

.new_media_source #button {
  padding: 24px;
}
</style>