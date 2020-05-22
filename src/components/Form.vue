<template>
   <div class="container">
        <ModalSuccess />
        <h1>Form validation</h1>
        <form role='form' class='form-horizontal' >
             <div class="form-group">
                <label for="name" class='float-md-left'>Name</label>
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <input v-model="name" ref='inputName' type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name">
                    <span class='error'>{{errors[0]}}</span>
                </ValidationProvider>
                <small  v-if="!stateName"  id="emailHelp" class="form-text text-danger text-left ">Invalid user name!</small>
            </div>
             <div class="form-group">
                <label for="email" class='float-md-left'>Email</label>
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <input v-model="email" ref='inputEmail' type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                    <small v-if="stateEmail" id="emailHelp" class="form-text text-muted text-left">We'll never share your email with anyone else.</small>
                    <small v-else id="emailHelp error" class="form-text text-danger text-left">Invalid email address!</small>
                    <span class='error'>{{errors[0]}}</span>
                 </ValidationProvider>
                
            </div>
            <button @click="applyData"  type='button' class="btn btn-primary">Apply</button> 
        </form> 
    </div>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
extend('required', {
  ...required,
  message: 'This field is required'
});
import ModalSuccess from './ModalSuccess'
import $ from 'jquery'
export default {
    name:"Form",
    data(){
        return {
            name:'',
            email:'',
            regexpForName:/^[?!,.а-яА-ЯёЁ\s]+$/,
            regexpForEmail:/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
            stateName: true,
            stateEmail: true,
        }
    },
    methods:{
        applyData() {
            if(!this.regexpForName.test(this.name) || this.name.length < 2){
                this.stateName = false 
                this.$refs.inputName.focus()
                return
            } else if(!this.regexpForEmail.test(this.email)){
               this.stateEmail = false 
                this.$refs.inputEmail.focus()
               return
            } else {
                $('#exampleModal').modal('show')
                this.name=''
                this.email=''
            }
            this.stateName = true
            this.stateEmail = true
        }
    },
    components: {
        ModalSuccess, ValidationProvider
    }
}
</script>
