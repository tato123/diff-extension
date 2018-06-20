<template>
    <div class="launcher">
        <label>test</label>
        <div class="logo" x-unfocus>
            <img src="./imgs/logo.png" x-unfocus/>
        </div>
    </div>
</template>

<script>
export default {
  name: "Launcher"
};
</script>

<style scoped>
@keyframes appear {
  0% {
    opacity: 0;
    transform: translateY(var(--offset));
  }
  100% {
    opacity: 1;
    transform: translate(0px);
  }
}
:host {
  display: block;
  position: fixed;
  bottom: var(--offset);
  right: var(--offset);

  --blue: #191b3b;
  --blue-2: #191b3bef;
  --pink: #e5397c;
  --offset: 64px;
}

.launcher {
  font-size: 20px;
  color: purple !important;
}

.md-appear {
  animation: appear 250ms normal forwards cubic-bezier(0.55, 0, 0.1, 1);
}

.launcher {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--blue);
  box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, 0.3);
  display: flex;
  flex: 1;
  cursor: pointer;
  position: relative;
}

.launcher:hover {
  background-color: var(--blue-2);
}

.launcher img {
  width: 32px;
  height: 32px;
}

.launcher .logo {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.number {
  color: white;
  display: flex;
  position: absolute;
  right: 16px;
  flex: 1;
}

[x-unfocus] {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  outline: none;
}
</style>