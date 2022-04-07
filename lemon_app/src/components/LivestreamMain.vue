<template>
  <a-layout has-sider>
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
    >
    <div class='logo'>
      <img src='../assets/logo.png' alt='lemon logo' style='width: 5rem; margin-top: 12px;'>
      <p style='color: #fff; font-size: 10px;'> Like Melon, but different </p>
    </div>
    <div>
      <a-button type='primary' style='margin-top: 12px' @click='showModal'>
        Add Media Source
      </a-button>
      <div class='card_stream' v-if='showStream'>
        <a-button v-if='showOnStream' class='show_on_stream' type='default' @click='showingStreamOption'>Show on Stream</a-button>
        <a-button v-if='!showOnStream' class='show_on_stream' type='danger' @click='showingStreamOption'>Hide on Stream</a-button>
        <img alt='camera' src='../assets/camera.png' style='width: 150px;' />
      </div>
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
        <div :style="{ background: '#000', padding: '24px', textAlign: 'center' }">
          <div class='stream'>
            <iframe class='iframe' style='height: auto; width: 100%;'>
              <video class='main_stream' style='aspect-ratio: 16/9;' autoplay playsinline></video>
            </iframe>
          </div>
        </div>
        <div>
          <a-button type='default'>Resize</a-button>
        </div>
        <div>
          <a-space>
            <a-button type='default'>Chat</a-button>
            <a-button type='default'>Record</a-button>
            <a-button type='primary'>Go Live</a-button>
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
  data() {
    return {
      visible: ref(false),
      showStream: false,
      showScreen: false,
      showOnStream: false,
    }
  },
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
        video: true,
        audio: true,
      }).then(stream => {
        const videoElement = document.getElementsByClassName('main_stream');
        
        videoElement.srcObject = stream;
        
        // this has a slight lag when the user exits the modal.
        this.visible = false;
        this.showStream = true;
        this.showingStreamOption();
      })
      .catch(err => alert(`${error.name}`));
    },

    showingStreamOption() {
      // displays image in sidebar
      this.showOnStream = !this.showOnStream;
    },
  },
});
</script>

<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  margin-top: 12px;
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

.card_stream {
  position: relative;
  text-align:center;
}

.card_stream img {
  border-radius: 12px;
}

.card_stream button {
  transform: translate(0, 60px);
}

.iframe {
 aspect-ratio: 16/9;
 display: block;
}
</style>