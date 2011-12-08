<?php

namespace Orakulas\SecurityBundle\Handlers;

use \Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use \Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use \Symfony\Component\HttpFoundation\Request;
use \Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use \Symfony\Component\HttpFoundation\Response;
use \Symfony\Component\Security\Core\Exception\AuthenticationException;

class AuthenticationHandler implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface {

    public function onAuthenticationSuccess(Request $request, TokenInterface $token) {
        $result = array('success' => true);
        return new Response(json_encode($result));

        /*if ($request->isXmlHttpRequest()) {
            $result = array('success' => true);
            return new Response(json_encode($result));
        } else {

        }*/
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception) {
        $result = array('success' => false);
        return new Response(json_encode($result));

        /*if ($request->isXmlHttpRequest()) {
            $result = array('success' => false);
            return new Response(json_encode($result));
        } else {
            // Handle non XtmlHttp request here
        }*/
    }

}
